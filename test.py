import discord
import os
from discord import Intents
import requests
from prettytable import PrettyTable
import json
import asyncio


intents = Intents(guilds=True, members=True)
client = discord.Client(intents=intents)

# Create a new session with your webUntis credentials
dc_token = 'MTA1MTQ4MzIwOTc3MjMwNjQ0Mg.GwN9B1.y014Z070LhXsKVF_YyHdgnjC6EwWDJL56C50pw'
dc_message_id = "MESSAGE_ID"


# Set the base URL of the webUntis monitor
base_url = "https://mese.webuntis.com/WebUntis/monitor"

# Set the parameters for the HTTP request
params = {
    "school": "OSZ%20IMT",
    "simple": 2,
    "type": 1,
    "monitorType": "tt",
    "name": "ITA%2012"
}

# Send the HTTP request to the webUntis monitor
response = requests.get(base_url, params=params)
# Get the response data as a string
response_data = response.text

# Parse the response data as JSON
#timetable = json.loads(response_data)

print(response_data)

# Create a new table
#table = PrettyTable()

# Add the columns to the table
#table.field_names = ["Day", "Lesson", "Subject", "Teacher", "Room"]

# Add the timetable data to the table
#for entry in timetable:
#    day = entry["day"]
#    lesson = entry["lesson"]
#    subject = entry["subject"]
#    teacher = entry["teacher"]
#    room = entry["room"]
#    table.add_row([day, lesson, subject, teacher, room])


#@client.event
#async def on_ready():
    # Get the target message where the timetable should be sent
#    target_message = await client.fetch_message(dc_message_id)
    
    # Send the timetable to the target message every 10 minutes
#    while True:
 #       await target_message.edit(content=table)
  #      await asyncio.sleep(10 * 60) # sleep for 10 minutes

# Start the Discord client
#client.run(dc_token)
