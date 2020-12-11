package workout;

import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

public interface WorkoutService {
    @SqlQuery("Select * from Users")
    @RegisterBeanMapper(Workout.class)
    List<Workout> findWorkout();

    @SqlUpdate("insert into users(name, levels) values(?,?)")
    void addWorkout(String name, int level);
    @SqlQuery("select * from users where id = ?")
    @RegisterBeanMapper(Workout.class)
    Workout getBarById(int id);
    @SqlUpdate("delete from users where id = ?")
    void deleteWorkout(int id);


}
