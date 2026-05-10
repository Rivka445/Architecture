using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class AuthResponseDto
    {
        public UserDTO? User { get; set; }
        public string? Token { get; set; }
    }
}
