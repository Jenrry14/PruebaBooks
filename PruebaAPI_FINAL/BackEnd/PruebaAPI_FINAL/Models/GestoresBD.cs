using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaAPI_FINAL.Models
{
    public class GestoresBD
    {
        [Key]
        public int IdBook { get; set; }

        public string Nombre { get; set; }
    }
}
