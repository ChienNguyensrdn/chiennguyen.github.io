using HRApi.Models;
using HRApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Distributed;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;
using System;
namespace HRApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        private readonly IDistributedCache _distributedCache;
        public EmployeeController(EmployeeService employeeService,IDistributedCache distributedCache)
        {
            _employeeService = employeeService;
            _distributedCache = distributedCache;
        }

        [HttpGet]
        public ActionResult<List<Employee>> Get() {
            var cacheKey = "getEmp";
            var cachedEmps = _distributedCache.GetString(cacheKey);
            if(string.IsNullOrEmpty(cachedEmps)){
                // cachedTime = "Expired";
                // Cache expire trong 5s
                var options = new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(120));
                // Nạp lại giá trị mới cho cache
                var str = JsonConvert.SerializeObject(_employeeService.Get());
                _distributedCache.SetString(cacheKey, str, options);
                cachedEmps = _distributedCache.GetString(cacheKey);
            }
            var emps =JsonConvert.DeserializeObject<List<Employee>>(cachedEmps);
            return emps;
        }
            

        [HttpGet("{id:length(24)}", Name = "GetEmployee")]
        public ActionResult<Employee> Get(string id)
        {
            var emp = _employeeService.Get(id);

            if (emp == null)
            {
                return NotFound();
            }

            return emp;
        }

        [HttpPost]
        public ActionResult<Employee> Create(Employee emp)
        {
            _employeeService.Create(emp);

            return CreatedAtRoute("GetEmployee", new { _id = emp._id.ToString() }, emp);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id,Employee empIn)
        {
            var emp = _employeeService.Get(id);

            if (emp == null)
            {
                return NotFound();
            }

            _employeeService.Update(id, empIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var emp = _employeeService.Get(id);

            if (emp == null)
            {
                return NotFound();
            }

            _employeeService.Remove(emp._id);

            return NoContent();
        }
    }
}