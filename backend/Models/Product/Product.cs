using System;
using System.Collections.Generic;

namespace backend.Models.Product;

public partial class Product
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public string? ImagePath { get; set; }

    public DateTime CreationDate { get; set; }

    public bool IsActive { get; set; }
}
