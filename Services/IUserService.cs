using DTOs;
namespace Services
{
    public interface IUserService
    {
        Task<bool> IsExistsUserById(int id);
        Task<AuthResponseDto> AddUser(UserRegisterDTO user);
        Task<UserDTO> GetUserById(int id);
        Task<List<UserDTO>> GetUsers();
        Task<AuthResponseDto> LogIn(UserLoginDTO existUser);
        Task UpdateUser(int id, UserRegisterDTO updateUser);
    }
}