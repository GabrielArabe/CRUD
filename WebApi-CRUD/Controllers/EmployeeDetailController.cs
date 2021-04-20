using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.Enum;
using WebApi_CRUD.Util;

namespace WebApi_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeDetailController : ControllerBase
    {
        private readonly EmployeeDetailContext _context;

        public EmployeeDetailController(EmployeeDetailContext context)
        {
            _context = context;
        }


        private ResultModel validate(EmployeeDetail employee)
        {
            if (string.IsNullOrWhiteSpace(employee.Name))
            {
                return new ResultModel() { Success = false, Message = "Enter your name" };
            }

            if (string.IsNullOrWhiteSpace(employee.LastName))
            {
                return new ResultModel() { Success = false, Message = "Enter your last name" };
            }

            if (!Enum.IsDefined(typeof(ESex), employee.Sex))
            {
                return new ResultModel() { Success = false, Message = "Enter your sex" };
            }

            if (employee.Age == 0)
            {
                return new ResultModel() { Success = false, Message = "Enter your age" };
            } 
            
            if (employee.Name.Length <= 3)
            {
                return new ResultModel() { Success = false, Message = "Your name must be longer than 3 letters" };
            }

            if (employee.LastName.Length <= 3)
            {
                return new ResultModel() { Success = false, Message = "Your last name must be longer than 3 letters" };
            }
             
            return new ResultModel() { Success = true };
        }



        // GET: api/EmployeeDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDetail>>> GetEmployeeDetails()
        {
            return await _context.EmployeeDetails.ToListAsync();
        }

        // GET: api/EmployeeDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDetail>> GetEmployeeDetail(int id)
        {
            var employeeDetail = await _context.EmployeeDetails.FindAsync(id);

            if (employeeDetail == null)
            {
                return NotFound();
            }

            return employeeDetail;
        }

        // PUT: api/EmployeeDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDetail(int id, EmployeeDetail employeeDetail)
        {
            if (id != employeeDetail.ID)
            {
                return BadRequest();
            }

            if (!EmployeeDetailExists(id))
            {
                return NotFound();
            }

            var result = validate(employeeDetail);
            if (result.Success)
            {
                _context.Entry(employeeDetail).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }

            return BadRequest(result.Message);
            
        }

        // POST: api/EmployeeDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeDetail>> PostEmployeeDetail(EmployeeDetail employeeDetail)
        {
            var result = validate(employeeDetail);
            if (result.Success)
            {
                _context.EmployeeDetails.Add(employeeDetail);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmployeeDetail", new { id = employeeDetail.ID }, employeeDetail);
            }            
            return BadRequest(result.Message);


        }

        // DELETE: api/EmployeeDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDetail(int id)
        {
            var employeeDetail = await _context.EmployeeDetails.FindAsync(id);
            if (employeeDetail == null)
            {
                return NotFound();
            }

            _context.EmployeeDetails.Remove(employeeDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeDetailExists(int id)
        {
            return _context.EmployeeDetails.Any(e => e.ID == id);
        }
    }
}
