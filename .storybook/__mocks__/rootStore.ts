export function useStores() {
  return {
    alertStore: { alerts: [], addAlert: () => {}, removeAlert: () => {} },
    popupStore: { popup: null, showPopup: () => {}, hidePopup: () => {}, setPopup: () => 'mock-popup-id', closePopup: () => {} },
    loadingStore: { isLoading: false },
    userStore: { driver: null },
    navigationStore: {},
    configStore: { isDebug: false },
    appStore: { isConnectionAvailable: true },
    taskNavigatorStore: { activeTask: null, taskList: [] },
    blocksStore: {},
    inboxStore: { unreadCount: 0 },
    customerPickupStore: {},
    customerDropoffStore: {},
    facilityPickupStore: {},
    facilityDropoffStore: {},
  };
}
