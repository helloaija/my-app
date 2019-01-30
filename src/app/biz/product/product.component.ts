import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from './product.service';
import {ProductAddComponent} from './product-add.component';

@Component({
    selector: 'view-product',
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.less']
})

export class ProductComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    sortValue = null;
    sortKey = null;

    // 添加表单窗口
    isAddFormVisible = false;
    isAddFormOkLoading = false;
    // productaddcomponent驼峰命名会找不到组件
    @ViewChild("productaddcomponent")
    private productAddComponent: ProductAddComponent;

    query(): void {
        alert(this.queryForm.controls['productNo'].value);
    }

    resetForm(): void {
        this.queryForm.reset();
    }

    constructor(private fb: FormBuilder, private productService: ProductService) {
    }

    ngOnInit(): void {
        this.queryForm = this.fb.group({
            productNo: [null, []],
            productName: [null, []],
            productNo1: [null, []],
            productName1: [null, []]
        });

        this.searchData();
    }

    filterGender = [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' }
    ];

    searchGenderList: string[] = [];

    sort(sort: { key: string, value: string }): void {
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.searchData();
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        // this.productService.getUsers(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
        //     this.loading = false;
        //     this.total = 200;
        //     this.dataSet = data.results;
        // });

        this.productService.getProducts().subscribe(data => {
            this.loading = false;
            if ("0000" == data['resultCode']) {
                let result = data['result'];
                this.total = result['totalCount'];
                this.dataSet = result['recordList'];
            }
            alert(data)
        }, error => {
            this.loading = false;
            alert(JSON.stringify(error))
        });
    }

    updateFilter(value: string[]): void {
        this.searchGenderList = value;
        this.searchData(true);
    }

    // 打开添加表单弹窗
    showAddForm(): void {
        this.isAddFormVisible = true;
    }

    // 添加表单弹窗-取消关闭
    addFormHandleCancel(): void {
        this.isAddFormVisible = false;
    }

    // 添加表单弹窗-确定
    addFormHandleOk(): void {
        this.isAddFormOkLoading = true;
        if (this.productAddComponent.submitForm()) {
            this.isAddFormOkLoading = true;
        }
        this.isAddFormOkLoading = false;
    }

}
