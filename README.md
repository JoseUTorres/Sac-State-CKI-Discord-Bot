<h3 align="center">
    <img height="100" src="https://cdn.discordapp.com/attachments/489930183143325706/862236688519528458/logoEmote8.png">
</h3>
<h1 align="center" style="font-weight: bold">
    Sac State CKI Discord Bot
</h1>
<p align="center">
    <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/JoseUTorres/Sac-State-CKI-Discord-Bot?include_prereleases&style=for-the-badge">
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
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043108214528557086/image.png" alt="/roscoe" height="300px">
    </h3>

    - Once the command is entered you will be prompted to enter the message you desire and you will have 10 mins to do so before the the command times out. Type the message right into the text channel you called the command from.
    - I suggest drafting your message before using the command because once schedule you cannot edit or delete your message until it is sent.
    - Note: If you are using an @ like @everyone I suggest using this command in a private text channel with limited people in it to avoid pinging everyone when scheduling your message.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043109700041986108/image.png" alt="/roscoe">
    </h3>

    - After the message is entered it will be deleted (as to not spoil the surprise 👌) and the bot will give either a success or error message.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043109792203415602/image.png" alt="/roscoe">
    </h3>

