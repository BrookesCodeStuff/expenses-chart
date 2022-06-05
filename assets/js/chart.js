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
          backgroundColor: "rgba(236, 117, 93, 1)",
          borderColor: "rgba(236, 117, 93, 1)",
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
  })
  .catch((err) => console.log(err));
