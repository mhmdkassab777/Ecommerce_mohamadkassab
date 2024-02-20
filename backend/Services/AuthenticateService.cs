using backend.Interfaces;
using backend.Models.User;
using backend.ViewModels.User;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class AuthenticateService: IAuthenticateService
    {
        private readonly IUserRepository _userRepository;
        public AuthenticateService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> AuthenticateUser(string email, string password)
        {
            User user = await _userRepository.GetActiveEmail(email);
            if (user != null)
            {           
                if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
