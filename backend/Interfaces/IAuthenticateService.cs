namespace backend.Interfaces
{
    public interface IAuthenticateService
    {
        Task<bool> AuthenticateUser(string email, string password);
    }
}
