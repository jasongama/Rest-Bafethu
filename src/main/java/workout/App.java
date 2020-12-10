package workout;

import com.google.gson.Gson;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

import java.util.HashMap;
import java.util.List;

import static spark.Spark.*;

public class App {

    public static void main(String[] args) {
        Jdbi jdbi = Jdbi.create("jdbc:postgresql://localhost:5432/workout?user=justin&password=justin123").installPlugin(new SqlObjectPlugin());
        port( getHerokuAssignedPort());
        Gson gson = new Gson();
        staticFiles.location("/public");

        get("/api/workouts", (request, response) -> {
            List<Workout> workouts = jdbi.withHandle(handle -> {
                WorkoutService workoutService = handle.attach(WorkoutService.class);
                return workoutService.findWorkout();
            });

            return workouts;
        }, gson::toJson);

        post("/api/workouts", (request, response) -> {
            System.out.println(request.body());
            Workout workout = gson.fromJson(request.body(),Workout.class);
            List<Workout> workouts = jdbi.withHandle(handle -> {
                WorkoutService workoutService = handle.attach(WorkoutService.class);
                workoutService.addWorkout(workout.getName(),workout.getLevels());

                return workoutService.findWorkout();
            });


            return workouts;
        }, gson::toJson);


    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }

}
