var five = require("johnny-five"),
    keypress = require('keypress'),
    board = new five.Board(),
    stdin = process.stdin;

keypress(process.stdin);
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
  // Johnny-Five provides pre-packages shield configurations!
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  var motors = new five.Motors([
        five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
        five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
      ]),
      leftMotor = motors[0],
      rightMotor = motors[1];

  console.log('Ready!');

  stdin.on("keypress", function (chunk, key) {
    if (!key) return;

    if (key.ctrl && key.name == 'c' || key.name == 'q') {
      process.exit();
    }

    // Note, the wheels were swapped on my bot, making fwd go backwards, and rev, go forward.
    // The controls below are adjusted accordingly.
    switch(key.name) {
      // continuous controls.
      case "down":
        motors.fwd(255);
        break;
      case "up":
        motors.rev(255);
        break;
      case "space":
        motors.stop();
        break;
      case "right":
        motors[1].fwd(75);
        motors[0].rev(75);
        break;
      case "left":
        motors[0].fwd(75);
        motors[1].rev(75);
        break;

      // impulse controls
      case "k": // backward
        motors.fwd(360);
        setTimeout(function () {
          motors.stop();
        }, 250);
        break;
      case "l": // right
        motors[0].fwd(150);
        motors[1].rev(150);
        setTimeout(function () {
          motors.stop();
        }, 250);
        break;
      case "j": // left
        motors[0].rev(150);
        motors[1].fwd(150);
        setTimeout(function () {
          motors.stop();
        }, 250);
        break;
      case "i": // forward
        motors.rev(360);
        setTimeout(function () {
          motors.stop();
        }, 250);
        break;

      default:
        break;
    }
  });
});
