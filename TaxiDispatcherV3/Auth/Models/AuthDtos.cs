using System.ComponentModel.DataAnnotations;

namespace TaxiDispatcherV3.Auth.Models
{
    public record RegisterUserDto([Required] string UserName, [EmailAddress][Required] string Email, [Required] string Password);

    public record LoginUserDto(string UserName, string Password);

    public record UserDto(string Id, string UserName, string Email);

    public record SuccessfulLoginDto(string accessToken); 
}
