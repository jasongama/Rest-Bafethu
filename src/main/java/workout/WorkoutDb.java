//package workout;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.SQLException;
//import java.util.Map;
//
//public class WorkoutDb {
//    private final String url = "jdbc:postgresql://localhost/workout";
//    private final String user = "justin";
//    private final String password = "justin123";
//
//    public Connection connect() {
//        Connection conn = null;
//        try {
//
//            conn = DriverManager.getConnection(url, user, password);
//            System.out.println("Connected to the PostgreSQL server successfully.");
//        } catch (SQLException e) {
//            System.out.println(e.getMessage());
//        }
//        return conn;
//
//
//    }
//
//    public void addToDataBase(Map<String, Object> workout) {
//        Connection conn = connect();
//
//        try {
//             final String INSERT_WORKOUT = "insert into workout ( name, levels,) values (?, ?)";
//            PreparedStatement insertWorkOut = conn.prepareStatement(INSERT_WORKOUT);
//            insertWorkOut.setString(1, (String) workout.get("name"));
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//    }
//}