using backend.DatabaseContext;
using backend.Interfaces;
using backend.Models.Product;
using backend.Models.User;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly EcommerceContext _context;
        public ProductRepository(EcommerceContext context)
        {
            _context = context;
        }
        public async Task<bool> Add(Product product)
        {
            _context.Add(product);
            return await Save();
        }
        public async Task<bool> Update(Product product)
        {
            _context.Update(product);
            return await Save();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<bool> Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

    }
}
