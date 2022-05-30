function skillsFunction() {
  let progresses = document.querySelectorAll(".progress");
  for (let i = 0; i < progresses.length; i++) {
    var value = progresses[i].attr("data-value");
    var left = progresses[i]
      .getElementsByClassName(".progress-left")[0]
      .getElementsByClassName(".progress-bar")[0];
    var right = progresses[i]
      .getElementsByClassName(".progress-right")
      .getElementsByClassName(".progress-bar")[0];

    if (value > 0) {
      if (value <= 50) {
        right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)");
      } else {
        right.css("transform", "rotate(180deg)");
        left.css(
          "transform",
          "rotate(" + percentageToDegrees(value - 50) + "deg)"
        );
      }
    }
  }

  function percentageToDegrees(percentage) {
    return (percentage / 100) * 360;
  }
}
