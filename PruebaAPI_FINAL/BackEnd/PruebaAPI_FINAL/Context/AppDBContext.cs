using Microsoft.EntityFrameworkCore;
using PruebaAPI_FINAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaAPI_FINAL.Context
{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext>options):base(options)
        {

        }

        public DbSet<GestoresBD> Book { get; set; }

        
    }
}
