using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PruebaAPI_FINAL.Context;
using PruebaAPI_FINAL.Models;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaAPI_FINAL.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly AppDBContext context;

        public BooksController(AppDBContext context)
        {
                this.context= context;
        }
        // GET: api/<BooksController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Book.ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}", Name = "GetBook")]
        public ActionResult Get(int id)
        {
            try
            {
                var gestor = context.Book.FirstOrDefault(g => g.IdBook == id);
                return Ok(gestor);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<BooksController>
        [HttpPost]
        public ActionResult Post([FromBody] GestoresBD libro)
        {
            try
            {
                context.Book.Add(libro);
                context.SaveChanges();
                return CreatedAtRoute("GetBook", new { id = libro.IdBook }, libro);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] GestoresBD libro)
        {
            try
            {
                if (libro.IdBook == id)
                {
                    context.Entry(libro).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetBook", new { id = libro.IdBook }, libro);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var libro = context.Book.FirstOrDefault(g => g.IdBook == id);
                if (libro != null)
                {
                    context.Book.Remove(libro);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
