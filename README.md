<h3 align="center">
    <img height="100" src="https://cdn.discordapp.com/attachments/489930183143325706/862236688519528458/logoEmote8.png">
</h3>
<h1 align="center" style="font-weight: bold">
    Sac State CKI Discord Bot
</h1>
<p align="center">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/JoseUTorres/Sac-State-CKI-Discord-Bot?style=for-the-badge">
</p>
<img src="https://live.staticflickr.com/65535/51665025161_3eddcb15b5_w.jpg" alt="ftc" align="right" height="200px">

The Sac State CKI Discord bot is a bot for Circle K International focused discord servers. With discord being used more by clubs there has become a need for CKI specific commands that other bots do not satisfy so this will be the place to provide those features. There was a previous version that was using Python but that version was more of a proof of concept. Now that I know more of what goes into a great bot, I have created a new version written in JS that hopefully works better and is easier to implement/update.

<img src="https://live.staticflickr.com/65535/51908054951_2481ec987d_w.jpg" alt="ftc" align="right" height="200px">

I will do my best to get features made quickly but I do have work along with my social life so please be patient with me. I hope you find the bot useful and please recommend any features that would help out! Also if there any bugs or errors let me know and I will investigate it ASAP. Do not be afraid to reach out to me personally. You can always contact me on discord @josé#6011. I will be the one with dancing kirby profile pic. Thank you for using my bot, I appreciate you all!

<p style="margin-left: auto; margin-right: 0px;">
    - jose 
</p>

## Getting Started
1. **Invite the bot to your server**
    - Note: You must an admin or owner of the server to invite the bot
    - This link will let you invite the [bot](https://discord.com/api/oauth2/authorize?client_id=840623082988503040&permissions=8&scope=bot)
2. **Set the permissions you want the bot to have in your server**
    - By default the bot is allowed Admin access but you can limit this by creating a role for your discord bots and granting or denying specific permissions.
3. **Try it out!**
    - To test if everything is good to go just try the /roscoe in a chat to see the cutest dog appear

## Commands

#### Where to access command directory
- All commands can be found by typing "/" into any channel
- On the left you will see a list of bots in the server

<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1049557823727620206/image.png" alt="/roscoe" height="300px">
</h3>

- Click on the bot with the CKI logo
<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1049558293829406810/image.png" alt="/roscoe" height="300px">
</h3>

- You now can view all the commands available and read the names and descriptions of the commands

#### How to use each command

1. **/roscoe**
    - Permissions Required to Use: None
    - Parameters: None
    - This command will send over a picture of roscoe to where the command was called.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043106982233641020/image.png" alt="/roscoe" height="300px">
    </h3>

2. **/schedule**
    - Permissions Required to Use: Ability to manage events
    - Parameters: channel (required), date (required) (YYYY/MM/DD), time (required)(HH:MM), am-pm (required), atatchment (optional)
    - This command is used to schedule messages for any desired time and date. You will need to provide the channel where the desired message will send, the date and time the message will be sent, and whether the time is AM or PM. If there are any attachment , i.e images, make sure to add it to the attachment field of the command.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043108214528557086/image.png" alt="/schedule" height="300px">
    </h3>

    - Once the command is entered you will be sent a direct message from the bot prompting you to enter the message you desire and you will have 10 mins to do so before the the command times out. Type the message into your direct messages with the bot. The bot will then save your message and send a confirmation message.
    - I suggest drafting your message before using the command because once schedule you cannot edit or delete your message until it is sent.
    - Note: If you are using an @ other than @everyone it will not work when the annoucment is posted. You will have to manually add the @ after the message has been posted.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1048023300732887050/image.png" alt="/schedule">
    </h3>

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1048023789910372392/image.png" alt="/schedule">
    </h3>

    - The bot will also confirm the by edit the reply to the command in the channel it was called from.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043109792203415602/image.png" alt="/schedule">
    </h3>

3. **/hours**
    - Permissions Required to Use: None
    - Parameters: first-name (required), last-name(required)
    - This command is used to get information about your current hours and MRP status according to the last updated MRS. The user can access only information about their own hours and if they are current memeber of the club

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1049555353685209110/image.png" alt="/schedule">
    </h3>

    - Once the command is entered a DM will be sent from the bot with following information: when the MRS was last updated, service, leadership, and fellowship hours. Lastly if the user is at MRP status of Bronze or higher that will also be provided.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1049556341414449152/image.png" alt="/schedule">
    </h3>

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1049556455545651230/image.png" alt="/schedule">
    </h3>
    
    - Note: If you have any questions about your hours please reach out to your Membership and Recognition chair.
