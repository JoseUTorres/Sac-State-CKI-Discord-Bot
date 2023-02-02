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

- - - -
## Commands

### Where to access command directory
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

### How to use each command

#### 1. __/roscoe__
- Permissions Required to Use: None
- Parameters: None
- This command will send over a picture of roscoe to where the command was called.

<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1043106982233641020/image.png" alt="/roscoe" height="300px">
</h3>

#### 2. __/schedule__
1. __/schedule post__ 
    - Permissions Required to Use: Ability to manage events
    - Parameters: channel (required), date (required) (YYYY/MM/DD), time (required)(HH:MM), am-pm (required), atatchment (optional)
    - This command is used to schedule messages for any desired time and date. You will need to provide the channel where the desired message will send, the date and time the message will be sent, and whether the time is AM or PM. If there are any attachment , i.e images, make sure to add it to the attachment field of the command.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068763148716359690/Screen_Shot_2023-01-27_at_9.22.19_PM.png" alt="/schedule" height="300px">
    </h3>

    - Once the command is entered you will be sent a direct message from the bot prompting you to enter the message you desire and you will have 10 mins to do so before the the command times out. Type the message into your direct messages with the bot. The bot will then save your message and send a confirmation message.
    - I suggest drafting your message before using the command because once schedule you cannot edit or delete your message until it is sent.
    - Note: If you are using an @ other than @everyone it will not work when the annoucment is posted.

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

2. __/schedule view__
    - Permissions Required to Use: Ability to manage events
    - Parameters: None
    - This command is to view all the currently scheduled posts along with the scheduled date. Each post is also assigned a number.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068765560436953159/Screen_Shot_2023-01-27_at_9.32.28_PM.png" alt="/schedule" height="300px">
    </h3>

3. __/schedule remove__
    - Permissions Required to Use: President or PR role
    - Parameters: Post number (required)
    - You can get the post number from /schedule view and once the command is sent the post will be removed and will not be posted.

    <h3 align="center">
        <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068768312189788160/Screen_Shot_2023-01-27_at_9.43.18_PM.png" alt="/schedule" width="800px">
    </h3>

#### 3. __/hours__
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

#### 4. __/signup__
- Permissions Required to Use: None
- Parameters: event (required), name (required), carpool (required), contact (optional), location (optional)
- This command is used to sign up for events on the Sac State CKI sign up sheet.

<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068771139171647578/Screen_Shot_2023-01-27_at_9.54.41_PM.png" alt="/schedule" width="800px">
</h3>

<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068771777641201704/Screen_Shot_2023-01-27_at_9.57.17_PM.png" alt="/schedule" width="800px">
</h3>

<h3 align="center">
    <img src="https://cdn.discordapp.com/attachments/1010399797338980363/1068772585518665728/Screen_Shot_2023-01-27_at_10.00.28_PM.png" alt="/schedule" width="800px">
</h3>
