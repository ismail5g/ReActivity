using System.Threading.Tasks;
using Application.Users;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
        [AllowAnonymous]
    public class UserController : BaseController
    {

        //[AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query){
            return await Mediator.Send(query);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command){
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query()); 
        }
    }
}