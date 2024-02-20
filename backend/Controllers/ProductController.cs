using backend.Interfaces;
using backend.Models.Product;
using backend.Services;
using backend.ViewModels.Product;
using backend.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ProductViewModel productViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                else
                {
                    Product product = new Product();
                    product.Title = productViewModel.Title;
                    product.Description = productViewModel.Description;
                    product.ImagePath = productViewModel.ImagePath;
                    product.Price= productViewModel.Price;
                    product.Quantity= productViewModel.Quantity;
                    product.CreationDate = DateTime.Now;
                    product.IsActive = productViewModel.IsActive;
                    _productRepository.Add(product);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromBody] ProductEditViewModel producteditViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                else
                {
                    Product product = new Product();
                    product.Id = producteditViewModel.Id;
                    product.Title = producteditViewModel.Title;
                    product.Description = producteditViewModel.Description;
                    product.ImagePath = producteditViewModel.ImagePath;
                    product.Price = producteditViewModel.Price;
                    product.Quantity = producteditViewModel.Quantity;
                    product.CreationDate = DateTime.Now;
                    product.IsActive = producteditViewModel.IsActive;
                    _productRepository.Update(product);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("getAll")]
        public async Task<IEnumerable<Product>> GetAll()
        {
            try
            {
                IEnumerable<Product> products = await _productRepository.GetAll();
                return products;
            }
         
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
