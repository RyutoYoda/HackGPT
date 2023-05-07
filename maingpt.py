# server.py
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
import openai
import aiofiles
import json

app = FastAPI()

from fastapi.staticfiles import StaticFiles

app.mount("/static_2", StaticFiles(directory="static_2"), name="static_2")

app.mount("/static_2/errimg",
          StaticFiles(directory="static_2/errimg"),
          name="errimg")

templates = Jinja2Templates(directory="static_2")

openai.api_key = " "

NUMBER_OF_IMAGES = 1


def get_completion(prompt, model="gpt-3.5-turbo", temperature=0):
  messages = [{"role": "user", "content": prompt}]
  response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=
    temperature,  # this is the degree of randomness of the model's output
  )
  return response.choices[0].message["content"]


def split_introduction_(Self_Introduction):
  print("split_introduction_ is xxxxxxxx", Self_Introduction)
  prompt = f"""
  「自己紹介」を基に、起承転結を意識して4コマ漫画を作りたい。「何コマ目か(数字)」と「起、承、転、結でそれぞれ文章(日本語)」と「その場面に該当する画像を出力するプロンプト(English)」を出力してください。
  
  出力はJSON形式のみにしてください。
  
  keyとvalueの対応を以下に示す。
  key:value
  = panels:何コマ目？
  = caption:その場面の説明
  = sceneDescription:その場面の絵を生成するプロンプト
  
  「自己紹介」
  {Self_Introduction}
  
  「出力例」
[  {{    "panels": "1",    "caption": "~が自己紹介をはじめる",    "sceneDescription": "A classroom is depicted in the background and ~ is standing there smiling. He waves his hand and says: 'Hello, I am ~'. The prompt says: 'Generate an image of a person introducing themselves.'"  }},
   {{    "panels": "2",    "caption": "~が夏休みに100km走る",    "sceneDescription": "A road is depicted in the background with the sun shining overhead. ~ is shown running with sweat on his face and clothes. In the last panel, he is shown with a medal around his neck, smiling with pride. The prompt says: 'Generate an image of a person running a long distance race.'"  }}, 
  {{    "panels": "3",    "caption": "~が茶道をしている",    "sceneDescription": "A traditional Japanese tea room is depicted in the background. ~ is shown sitting on a tatami mat, wearing a kimono and preparing tea. The prompt says: 'Generate an image of a person performing Japanese tea ceremony.'"  }}, 
  {{    "panels": "4",    "caption": "~がランニングの大会に参加し、完走する",    "sceneDescription": "A marathon race is depicted in the background with cheering crowds. ~ is shown running and sweating. In the last panel, he is shown crossing the finish line with his arms raised in victory. The prompt says: 'Generate an image of a person running a marathon and crossing the finish line.'"  }}
]

  """
  split_introduction_json_str = get_completion(prompt)
  split_introduction_json = json.loads(split_introduction_json_str)
  print("split_introduction_json", split_introduction_)
  return split_introduction_json


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
  return templates.TemplateResponse("Main.html", {
    "request": request,
    "generated_images": None
  })


@app.post("/generate")
async def generate_images(text: str = File(...), name: str = File(...)):
  print("name is: " + name)
  introduction_json = split_introduction_(text)
  print("introduction_json is ", introduction_json)
  generated_images = []
  caption = []
  for introduction_json_item in introduction_json:
    sceneDescription = introduction_json_item["sceneDescription"]
    caption.append(introduction_json_item["caption"])
    response = openai.Image.create(
      prompt=sceneDescription,
      n=NUMBER_OF_IMAGES,
      size="512x512",
      response_format="url",
    )
    generated_images.append(response["data"])
  # Create a JSON object containing the generated images
  result = {"generated_images": generated_images, "captions": caption}

  # Return the JSON object as a response
  return JSONResponse(content=result)


if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)
