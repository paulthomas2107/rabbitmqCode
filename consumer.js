const amqp = require("amqplib");

connect();

async function connect() {
  try {
    console.log("Started...");
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received Job : ${input.number}`);
      if (input.number == 21766) {
        channel.ack(message);
        console.log("Ack complete");
      }
    });
    console.log("Waiting for messages....");
  } catch (ex) {
    console.log(ex);
  }
  console.log("Ended...");
}
