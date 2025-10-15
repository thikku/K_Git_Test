from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ColoringPage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    prompt: str
    complexity: str  # simple, medium, detailed
    image_data: str  # base64 encoded image
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    category: Optional[str] = None

class GenerateRequest(BaseModel):
    prompt: str
    complexity: str = "medium"

class Template(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    category: str
    preview_url: str
    prompt: str
    complexity: str

# Templates data
TEMPLATES = [
    {"id": "1", "name": "Cute Dinosaur", "category": "Animals", "preview_url": "https://images.unsplash.com/photo-1567727014928-5f4aa30c4c15?w=400", "prompt": "friendly dinosaur with big smile", "complexity": "simple"},
    {"id": "2", "name": "Butterfly", "category": "Animals", "preview_url": "https://images.unsplash.com/photo-1618810741895-c0eb18eea601?w=400", "prompt": "beautiful butterfly with detailed wings", "complexity": "medium"},
    {"id": "3", "name": "Space Rocket", "category": "Vehicles", "preview_url": "https://images.unsplash.com/photo-1608120621607-2f2eb25b85d3?w=400", "prompt": "rocket ship flying through space", "complexity": "medium"},
    {"id": "4", "name": "Flower Garden", "category": "Nature", "preview_url": "https://images.unsplash.com/photo-1632132142885-3752d64bcfc0?w=400", "prompt": "beautiful flower garden with different flowers", "complexity": "detailed"},
    {"id": "5", "name": "Unicorn", "category": "Fantasy", "preview_url": "https://images.unsplash.com/photo-1567727014928-5f4aa30c4c15?w=400", "prompt": "magical unicorn with rainbow mane", "complexity": "medium"},
    {"id": "6", "name": "Race Car", "category": "Vehicles", "preview_url": "https://images.unsplash.com/photo-1618810741895-c0eb18eea601?w=400", "prompt": "fast race car with spoiler", "complexity": "simple"},
    {"id": "7", "name": "Mandala", "category": "Patterns", "preview_url": "https://images.unsplash.com/photo-1608120621607-2f2eb25b85d3?w=400", "prompt": "intricate mandala pattern", "complexity": "detailed"},
    {"id": "8", "name": "Cat", "category": "Animals", "preview_url": "https://images.unsplash.com/photo-1632132142885-3752d64bcfc0?w=400", "prompt": "cute cat sitting", "complexity": "simple"},
]

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "ColorCraft API"}

@api_router.post("/generate", response_model=ColoringPage)
async def generate_coloring_page(request: GenerateRequest):
    try:
        # Build prompt for line art
        complexity_instruction = {
            "simple": "very simple, bold outlines, minimal details, suitable for young children",
            "medium": "moderate detail, clear outlines, suitable for all ages",
            "detailed": "intricate details, complex patterns, suitable for adults"
        }
        
        full_prompt = f"Create a black and white line art coloring page of {request.prompt}. Style: {complexity_instruction.get(request.complexity, 'moderate detail')}. High contrast, clear black outlines on white background, no shading or gray tones."
        
        # Initialize LlmChat with Gemini
        chat = LlmChat(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            session_id=str(uuid.uuid4()),
            system_message="You are an expert at creating coloring pages with clean line art."
        )
        chat.with_model("gemini", "gemini-2.5-flash-image-preview").with_params(modalities=["image", "text"])
        
        # Generate image
        msg = UserMessage(text=full_prompt)
        text, images = await chat.send_message_multimodal_response(msg)
        
        if not images or len(images) == 0:
            raise HTTPException(status_code=500, detail="No image generated")
        
        # Get first image
        image_data = images[0]['data']
        
        # Create coloring page document
        coloring_page = ColoringPage(
            prompt=request.prompt,
            complexity=request.complexity,
            image_data=image_data
        )
        
        # Save to database
        doc = coloring_page.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.coloring_pages.insert_one(doc)
        
        return coloring_page
        
    except Exception as e:
        logging.error(f"Error generating coloring page: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate coloring page: {str(e)}")

@api_router.get("/gallery", response_model=List[ColoringPage])
async def get_gallery():
    try:
        pages = await db.coloring_pages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        
        for page in pages:
            if isinstance(page.get('created_at'), str):
                page['created_at'] = datetime.fromisoformat(page['created_at'])
        
        return pages
    except Exception as e:
        logging.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery")

@api_router.get("/templates")
async def get_templates():
    return {"templates": TEMPLATES}

@api_router.post("/templates/{template_id}/generate", response_model=ColoringPage)
async def generate_from_template(template_id: str):
    try:
        # Find template
        template = next((t for t in TEMPLATES if t["id"] == template_id), None)
        if not template:
            raise HTTPException(status_code=404, detail="Template not found")
        
        # Generate using template prompt
        request = GenerateRequest(prompt=template["prompt"], complexity=template["complexity"])
        result = await generate_coloring_page(request)
        result.category = template["category"]
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error generating from template: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate from template")

@api_router.delete("/gallery/{page_id}")
async def delete_page(page_id: str):
    try:
        result = await db.coloring_pages.delete_one({"id": page_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Page not found")
        return {"message": "Page deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error deleting page: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete page")

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()