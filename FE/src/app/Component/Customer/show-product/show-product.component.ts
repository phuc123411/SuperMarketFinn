import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ImageService } from 'src/app/Services/image.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  product: any = {};
  images: any[] = [];
  productId: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      this.loadProduct();
      this.loadImages();
    });
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe(
      (data: any) => {
        this.product = data;
        this.brandService.getBrand(this.product.brandId).subscribe(
          (brand: any) => {
            this.product.brandName = brand.name;
          }
        );
        this.categoryService.getCategory(this.product.categoryId).subscribe(
          (category: any) => {
            this.product.categoryName = category.name;
          }
        );
        this.loadMainProductImage(); // Load main product image after loading product
      },
      (error) => {
        console.error('Error loading product', error);
      }
    );
  }

  loadMainProductImage() {
    this.imageService.getMainProductImage(this.productId).subscribe(
      (image: any) => {
        // Assuming the response has an 'imageUrl' property
        this.product.imageUrl = image.urlImage; // Assign imageUrl to product
      },
      (error) => {
        console.error(`Error loading main image for product ${this.productId}`, error);
      }
    );
  }

  loadImages() {
    this.imageService.getImages(this.productId).subscribe(
      (data: any[]) => {
        this.images = data;
        console.log(this.images);
      },
      (error) => {
        console.error('Error loading product images', error);
      }
    );
  }
}
