using backend.DatabaseContext;
using backend.Interfaces;
using backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly EcommerceContext _context;
        public UserRepository(EcommerceContext context)
        {
            _context = context;
        }
        public async Task<User> GetActiveEmail(string Email)
        {
            return await _context.Users.FirstOrDefaultAsync(i => i.IsActive == true && i.Email == Email);
        }
    }
}
