// typings.d.ts

// You should specify the CKEditor 5 build you use here:
declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditorBuild: any;

    export = ClassicEditorBuild;
}

declare module '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter' {
    const Base64UploadAdapter: any;

    export = Base64UploadAdapter;
}