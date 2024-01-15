﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Wheelingful.Core.Contracts.Auth;
using Wheelingful.Data.DbContexts;
using Wheelingful.Data.Entities;
using Wheelingful.Data.Outer;

namespace Wheelingful.Data;

public static class DependencyInjection
{
    public static void AddDbContext(this IServiceCollection services, IConfiguration config)
    {
        var serverVersion = new MySqlServerVersion(new Version(5, 7));

        services.AddDbContext<WheelingfulDbContext>(options =>
            options.UseMySql(config.GetConnectionString("DefaultConnection"), serverVersion));
    }

    public static void AddIdentity(this IServiceCollection services)
    {
        services.AddIdentityCore<User>()
            .AddEntityFrameworkStores<WheelingfulDbContext>();
    }

    public static void AddDataOuter(this IServiceCollection services)
    {
        services.AddScoped<ILoginService, LoginService>();
        services.AddScoped<IRefreshTokenManager, RefreshTokenManager>();
    }
}
