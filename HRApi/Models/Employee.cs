using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
namespace HRApi.Models
{
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("employee_code")]
        [JsonProperty("employee_code")]
        public string employee_code { get; set; }
        public string full_name { get; set; }
    }
}