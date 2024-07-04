﻿using System.ComponentModel.DataAnnotations.Schema;

namespace supermarket_backend.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public string? Description { get; set; }
        public decimal TotalPrice { get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public ICollection<Order_Detail>? Order_Details { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
