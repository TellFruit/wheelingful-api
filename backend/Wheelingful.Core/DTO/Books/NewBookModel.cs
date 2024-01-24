﻿using Wheelingful.Core.Enums;

namespace Wheelingful.Core.DTO.Books;

public class NewBookModel
{
    public required string Title { get; set; }
    public required string CoverBase64 { get; set; }
    public string Description { get; set; } = null!;
    public BookCategoryEnum Category { get; set; }
    public BookStatusEnum Status { get; set; }
    public string AuthorId { get; set; } = null!;
    public string CoverId { get; set; } = null!;
}