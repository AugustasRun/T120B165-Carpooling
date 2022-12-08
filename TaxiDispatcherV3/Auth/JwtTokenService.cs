using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TaxiDispatcherV3.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string userName, string userID, IEnumerable<string> userRoles);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private string _audience;
        private string _issuer;
        private SymmetricSecurityKey _authKey;

        public JwtTokenService(IConfiguration configuration)
        {
            _authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            _issuer = configuration["JWT:ValidIssuer"];
            _audience = configuration["JWT:ValidAudience"];
        }

        public string CreateAccessToken(string userName, string userID, IEnumerable<string> userRoles)
        {
            var authClaims = new List<Claim>
            {
                new (ClaimTypes.Name, userName),
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new (JwtRegisteredClaimNames.Sub, userID)
            };

            authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));

            var accessToken = new JwtSecurityToken
                (
                    issuer: _issuer,
                    audience: _audience,
                    expires: DateTime.UtcNow.AddHours(1), // 5 min
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(_authKey, SecurityAlgorithms.HmacSha256)
                );
            return new JwtSecurityTokenHandler().WriteToken(accessToken);
        }
    }
}
