# bot.py
import os
import discord
from dotenv import load_dotenv

# 加載 .env 文件中的環境變量
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

# 設置 intents，這裡我們使用默認 intents 並啟用 message_content
intents = discord.Intents.default()
intents.message_content = True  # 如果你想讓機器人能讀取消息內容

# 創建 Client 並傳遞 intents
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'{client.user} 現在開始為您服務!')

client.run(TOKEN)