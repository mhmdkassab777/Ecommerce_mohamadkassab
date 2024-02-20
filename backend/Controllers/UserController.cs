using backend.Interfaces;
using backend.Models.User;
using backend.Services;
using backend.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.CodeAnalysis;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IAuthenticateService _authenticateService;
        private readonly IConfiguration _configuration;
        public UserController(IAuthenticateService authenticateService, IConfiguration configuration) 
        {
            _authenticateService = authenticateService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                else
                {
                    bool isAuthenticated = await _authenticateService.AuthenticateUser(loginViewModel.Email, loginViewModel.Password);
                    if (isAuthenticated)
                    {
                        List<Claim> claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Email, loginViewModel.Email),
                        };
                        JWTService jwtAuth = new JWTService(_configuration);
                        string jwt = (await jwtAuth.JWTGenerator(claims))!;
                        var cookieOptions = new CookieOptions
                        {
                            HttpOnly = true,
                            Expires = DateTime.Now.AddHours(8) // Set the cookie expiration time
                        };
                        HttpContext.Response.Cookies.Append("ecommerceAuth", jwt, cookieOptions);
                        HttpContext.Session.SetString("UserEmail", loginViewModel.Email);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }   
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

        }
  
    }
}
