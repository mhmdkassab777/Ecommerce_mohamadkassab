using backend.Models.User;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetActiveEmail(string Email);
    }
}
