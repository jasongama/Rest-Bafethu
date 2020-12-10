  const listWorkoutsTemplateText = document.querySelector(".listWorkoutsTemplate");
    const listWorkoutsTemplate = Handlebars.compile(listWorkoutsTemplateText.innerText);

    const workout =  document.querySelector(".workouts");

    const addPlayer = () => {
        const name = "Jason"; // comes from input body / form
        const levels = 30; // comes from model

        addWorkouts({ name, levels})
    }
    const addWorkouts = (data) => axios.post("/api/workouts", data)
            .then(function(result) {
            getWorkouts();
              })
              .catch(function(err){
                console.log(err);
              });

    const getWorkouts = () => axios.get("/api/workouts")
        .then(function(result) {
        console.log(result)
                  workout.innerHTML = listWorkoutsTemplate({workouts  : result.data})
          })
          .catch(function(err){
            console.log(err);
          });



