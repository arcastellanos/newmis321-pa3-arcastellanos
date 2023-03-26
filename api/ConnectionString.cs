namespace api
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString(){
            string server = "r4wkv4apxn9btls2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "qgzctppht71vdyea";
            string port = "3306";
            string username = "pkpi64vsmugy3l2p";
            string password = "zcd7pg8qqip4mttf";

            cs = $@"server = {server};user={username};database={database}; port={port};password={password};";
        }
    }
}