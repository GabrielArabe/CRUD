using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.Enum;

namespace WebAPI.Models
{
    public class EmployeeDetail
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string  LastName { get; set; }
        [Required]
        [Column(TypeName = "int")]
        public int Age { get; set; }
        [Required]
        [Column(TypeName = "int")]
        public ESex Sex { get; set; }
        [Required]
        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }
    }
}
