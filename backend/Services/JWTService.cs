using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class JWTService
    {
        private readonly IConfiguration _configuration;
        public JWTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string?> JWTGenerator(List<Claim> claims)
        {
            try
            {
                var securityKey = Encoding.ASCII.GetBytes(_configuration.GetSection("Jwt:Secret").Value);
                var credentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256Signature);

                var token = new JwtSecurityToken(
                    _configuration.GetSection("Jwt:Issuer").Value,
                    _configuration.GetSection("Jwt:Audience").Value,
                    claims,
                    expires: DateTime.Now.AddHours(8),
                    signingCredentials: credentials
                );

                string jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
