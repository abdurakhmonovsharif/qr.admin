import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-qr.svg";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const themes = [
    <svg
      fill={color}
      width="20"
      height="20"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5 15c-.797 0-1.456.314-1.88.793-.424.48-.62 1.098-.62 1.707 0 .78-.568 1.418-.81 1.607-.372.294-.165.892.31.893H17c.786 0 1.517-.23 2.072-.662.555-.432.928-1.09.928-1.838 0-.683-.193-1.32-.63-1.785C18.93 15.25 18.273 15 17.5 15zm0 1c.57 0 .914.16 1.14.4.227.24.36.602.36 1.1 0 .432-.19.776-.54 1.05-.353.272-.872.45-1.46.45h-1.423c.237-.4.422-.9.422-1.5 0-.39.13-.772.368-1.043.24-.27.583-.457 1.132-.457zM29.284 5.01c-.126.015-.233.048-.352.09-.238.08-.513.21-.838.374-.65.33-1.477.813-2.35 1.365-1.75 1.103-3.66 2.457-4.642 3.438-.935.934-1.616 1.784-1.936 2.637-.32.852-.186 1.777.478 2.44.665.665 1.59.8 2.442.48.853-.32 1.703-1.002 2.637-1.936.98-.983 2.335-2.893 3.44-4.64.552-.876 1.035-1.704 1.365-2.353.165-.324.293-.6.375-.838.04-.12.072-.226.086-.352.013-.126.047-.327-.167-.54-.214-.215-.413-.18-.54-.167zm-.647 1.444c-.307.603-.78 1.416-1.32 2.27-1.08 1.713-2.46 3.628-3.3 4.468-.888.887-1.678 1.48-2.283 1.707-.604.225-.954.177-1.383-.25-.427-.43-.475-.78-.25-1.384.228-.604.82-1.394 1.71-2.28.84-.84 2.754-2.22 4.466-3.3.856-.542 1.668-1.015 2.272-1.322.134-.036.13.022.09.09zM2.5 8h17c.277 0 .5.223.5.5s-.223.5-.5.5h-17c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM7 6.5c0 .276-.224.5-.5.5S6 6.776 6 6.5s.224-.5.5-.5.5.224.5.5zm-2 0c0 .276-.224.5-.5.5S4 6.776 4 6.5s.224-.5.5-.5.5.224.5.5zm-2 0c0 .276-.224.5-.5.5S2 6.776 2 6.5s.224-.5.5-.5.5.224.5.5zM1.5 4C.678 4 0 4.678 0 5.5v19c0 .822.678 1.5 1.5 1.5h25c.822 0 1.5-.678 1.5-1.5v-12c0-.668-1-.665-1 0v12c0 .286-.214.5-.5.5h-25c-.286 0-.5-.214-.5-.5v-19c0-.286.214-.5.5-.5h25c.665 0 .657-1 0-1z" />
    </svg>,
  ];

  const users = [
    <svg
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 0C3.56717 0 2 1.56567 2 3.49804C2 5.43041 3.56717 6.99609 5.5 6.99609C7.43283 6.99609 9 5.43041 9 3.49804C9 1.56567 7.43283 0 5.5 0Z"
        fill={color}
      />
      <path
        d="M3.5 8.99414C1.56711 8.99414 0 10.5605 0 12.4936V14.9909H11V12.4936C11 10.5605 9.43289 8.99414 7.5 8.99414H3.5Z"
        fill={color}
      />
      <path
        d="M12.5 10H12V15H15V12.5C15 11.1193 13.8807 10 12.5 10Z"
        fill={color}
      />
      <path
        d="M11.5 4C10.1193 4 9 5.11929 9 6.5C9 7.88071 10.1193 9 11.5 9C12.8807 9 14 7.88071 14 6.5C14 5.11929 12.8807 4 11.5 4Z"
        fill={color}
      />
    </svg>,
  ];
  const procuts = [
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 342.941 342.941"
      style={{ enableBackground: "new 0 0 342.941 342.941" }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M7.015,208.883h328.912c0.043,0.006,0.098,0,0.121,0c3.453,0,6.236-2.795,6.236-6.236c0-1.266-0.372-2.447-1.023-3.422
   L265.207,13.231c-0.962-2.344-3.239-3.878-5.772-3.878H83.51c-2.533,0-4.807,1.535-5.775,3.878L1.242,200.291
   c-0.785,1.918-0.563,4.109,0.597,5.839C2.993,207.848,4.938,208.883,7.015,208.883z M87.693,21.823h167.552l71.39,174.589H16.298
   L87.693,21.823z"
          />
          <path
            d="M6.235,240.059h330.471c3.446,0,6.235-2.795,6.235-6.235s-2.789-6.235-6.235-6.235H6.235
   c-3.449,0-6.235,2.795-6.235,6.235S2.786,240.059,6.235,240.059z"
          />
          <path
            d="M99.765,59.235h137.177c3.446,0,6.235-2.795,6.235-6.235s-2.789-6.235-6.235-6.235H99.765
   c-3.449,0-6.235,2.795-6.235,6.235S96.315,59.235,99.765,59.235z"
          />
          <path
            d="M87.294,90.412h162.118c3.446,0,6.235-2.795,6.235-6.235s-2.789-6.235-6.235-6.235H87.294
   c-3.45,0-6.235,2.795-6.235,6.235S83.845,90.412,87.294,90.412z"
          />
          <path
            d="M261.883,109.118H74.824c-3.45,0-6.235,2.795-6.235,6.235c0,3.44,2.786,6.235,6.235,6.235h187.059
   c3.446,0,6.235-2.795,6.235-6.235C268.118,111.913,265.329,109.118,261.883,109.118z"
          />
          <path
            d="M6.235,271.235h330.471c3.446,0,6.235-2.795,6.235-6.235s-2.789-6.235-6.235-6.235H6.235C2.786,258.765,0,261.56,0,265
   S2.786,271.235,6.235,271.235z"
          />
          <path
            d="M6.235,302.412h330.471c3.446,0,6.235-2.795,6.235-6.235s-2.789-6.235-6.235-6.235H6.235
   c-3.449,0-6.235,2.795-6.235,6.235S2.786,302.412,6.235,302.412z"
          />
          <path
            d="M6.235,333.588h330.471c3.446,0,6.235-2.795,6.235-6.234c0-3.441-2.789-6.236-6.235-6.236H6.235
   c-3.449,0-6.235,2.795-6.235,6.236C0,330.793,2.786,333.588,6.235,333.588z"
          />
        </g>
      </g>
    </svg>,
  ];
  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="#" />
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === "users" ? color : "",
              }}
            >
              {users[0]}
            </span>
            <span className="label">Пользователи</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" style={{ marginTop: "10px" }}>
          <NavLink to="/themes">
            <span
              className="icon"
              style={{
                background: page === "themes" ? color : "",
              }}
            >
              {themes[0]}
            </span>
            <span className="label">Темы</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3" style={{ marginTop: "10px" }}>
          <NavLink to="/products">
            <span
              className="icon"
              style={{
                background: page.includes("products") ? color : "",
              }}
            >
              {procuts[0]}
            </span>
            <span className="label">Продукты</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
