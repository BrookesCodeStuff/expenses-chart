let expenses = [];
let xLabels = [];
fetch("./assets/js/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }
    return response.json();
  })
  .then((json) => {
    for (let i = 0; i < json.length; i++) {
      expenses.push(json[i].amount);
      xLabels.push(json[i].day);
    }
    const data = {
      labels: xLabels,
      datasets: [
        {
          backgroundColor: [
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
            "rgba(236, 117, 93, 1)",
          ],
          borderColor: "rgba(236, 117, 93, 1)",
          hoverBackgroundColor: [
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
            "rgba(236, 117, 93, .5)",
          ],
          data: expenses,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        borderRadius: 3,
        backgroundColor: "rgba(236, 117, 93, 1)",
        scales: {
          y: {
            grid: {
              display: false,
            },
            display: false,
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "hsl(28, 10%, 53%)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    const expenseChart = new Chart(
      document.getElementById("expenseChart"),
      config
    );

    const highestValue = Math.max(...expenses);
    let dataset = expenseChart.data.datasets[0];
    for (var i = 0; i < dataset.data.length; i++) {
      console.log(dataset.data[i]);
      if (dataset.data[i] === highestValue) {
        dataset.backgroundColor[i] = "hsl(186, 34%, 60%)";
        dataset.hoverBackgroundColor[i] = "hsla(186, 34%, 60%, 50%)";
      }
    }

    expenseChart.update();
  })
  .catch((err) => console.log(err));
