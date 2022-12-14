import discord
from discord import Intents

intents = Intents(guilds=True, members=True)
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    channel = client.get_channel(825885777925111848)
    await channel.send('hello')

client.run('MTA1MTQ4MzIwOTc3MjMwNjQ0Mg.GwN9B1.y014Z070LhXsKVF_YyHdgnjC6EwWDJL56C50pw')
