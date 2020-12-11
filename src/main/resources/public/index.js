  const listWorkoutsTemplateText = document.querySelector(".listWorkoutTemplate");
    const listWorkoutsTemplate = Handlebars.compile(listWorkoutsTemplateText.innerText);

    const workout =  document.querySelector(".workouts");
    const userName =  document.querySelector(".userName");
    const level =  document.querySelector(".level");

    const addPlayer = () => {
    console.log(userName.value)
        const name = userName.value; // comes from input body / form
        const levels = level.value; // comes from model

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



