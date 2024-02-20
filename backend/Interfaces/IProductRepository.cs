using backend.Models.Product;
using backend.Models.User;

namespace backend.Interfaces
{
    public interface IProductRepository
    {
        Task<bool> Add(Product product);
        Task<bool> Update(Product product);
        Task<IEnumerable<Product>> GetAll();
        Task<bool> Save();
    }
}
