const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) throw error0;

  // create a channel
  // houses most of the API for getting things done
  connection.createChannel((error1, channel) => {
    if (error1) throw error1;

    const queue = 'hello';
    // const msg = 'Hello world';
    const msgs = ['what up', 'hello', 'hi', 'that is cool'];

    // declare a queue to send to
    // it will only be created if it doesn't exist already
    channel.assertQueue(queue, { durable: false });

    // publish a message to the queue
    // channel.sendToQueue(queue, Buffer.from(msg));
    let counter = 10;
    while (counter > 0) {
      const msg = msgs[Math.floor(Math.random() * 4)];
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(`\t Sent ${msg}`);
      counter--;
    }
  });

  setTimeout(() => {
    connection.close();
    process.exit(0)
  }, 500);
});