import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { ImageService } from 'src/app/Services/image.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  categoryId: number = 0;

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      this.loadProducts();
      this.loadCategories();
    });
  }

  loadProducts() {
    this.productService.getProductsByCategoryId(this.categoryId).subscribe(
      (data: any[]) => {
        this.products = data;
        this.loadProductImages(); // Load images after products are loaded
        console.log(data);
      },
      (error) => {
        console.error('Error loading featured products', error);
      }
    );
  }

  loadProductImages() {
    // Create an array of observables for image requests
    const requests = this.products.map(product =>
      this.imageService.getMainProductImage(product.id)
    );

    // Combine all requests and subscribe once to update products after all images are loaded
    forkJoin(requests).subscribe(
      (images: any[]) => {
        images.forEach((image, index) => {
          this.products[index].imageUrl = image.urlImage; // Assign imageUrl to product
        });
      },
      (error) => {
        console.error('Error loading product images', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }
}
