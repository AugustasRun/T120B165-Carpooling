using Microsoft.AspNetCore.Identity;
using TaxiDispatcherV3.Auth.Models;

namespace TaxiDispatcherV3.Data
{
    public class AuthDbSeedRoles
    {
        private readonly UserManager<ClinicUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthDbSeedRoles(UserManager<ClinicUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddAdminUser();
            await AddDefaultRoles();
        }

        private async Task AddDefaultRoles()
        {
            var newAdmin = new ClinicUser
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };
            var adminExists = await _userManager.FindByNameAsync(newAdmin.UserName);
            if (adminExists == null)
            {
                var createAdminResult = await _userManager.CreateAsync(newAdmin, "Administratorius1!");
                if (createAdminResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdmin, ClinicRoles.All);
                }
            }
        }

        private async Task AddAdminUser()
        {
            foreach (var role in ClinicRoles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (!roleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }
}
