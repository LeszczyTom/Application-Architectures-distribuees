require('dotenv').config({path: "app/.env"});

const Ice = require("ice").Ice;
const PlayerCommand = require("./app/PlayerCommands").tl;


let player1 = null
let player2 = null
let communicator = null

async function startIce() {
    try {
        // Create Initialization Data for the Ice Communicator
        let id = new Ice.InitializationData()
        id.properties = Ice.createProperties()
        id.properties.setProperty("Ice.Default.Locator", process.env.ICE_DEFAULT_LOCATOR)

        // Create the Ice Communicator with the Initialization Data
        communicator = Ice.initialize(id)

        player1 = await PlayerCommand.PlayerCommandsPrx.checkedCast(communicator.stringToProxy("player1@Serv1.PlayerAdapter"))
        player2 = await PlayerCommand.PlayerCommandsPrx.checkedCast(communicator.stringToProxy("player2@Serv2.PlayerAdapter"))

    } catch (e) {
        console.log(e)
        await endIce()
    }
}

async function endIce() {
    if(communicator) {
        await communicator.destroy().then(() => {
            throw new Error("FINISHED")
        })
    }
}


/*
startIce().then(
    async () => {
        await player2.stop().then(async () => {
            await player1.playSong("Music-Sounds-Better-With-You.mp3")
            await player1.play(true)
        })
    }
)
*/

startIce().then(
    async () => {
        await player1.stop().then(async () => {
            await player2.playSong("Daft-Punk-Veridis-Quo.mp3")
            await player2.play(true)
        })
    }
)
